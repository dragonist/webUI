		window.addEventListener('load',function(){
			eventClick(); 
		},false);


		function eventClick() {
			var eleButton=document.getElementById('buttonOnNavTitle'); 
			var eleSection=document.getElementById('onNavTitle');
			var bodyArea = document.body;


			bodyArea.addEventListener('click',function(e){
				if(eleSection.style.display=="block"){//장르 부분
					if(e.target.offsetParent==eleSection){
						getChangeBooks(e.target);
					}
					eleSection.style.display="none";
				}
				if(e.target.id=="moreButton1"){//더보기 부분
					e.target.style.display="none";
					getMoreBooks();
					fixArticle();
				}
			},false);

			eleButton.addEventListener('click',function(e){//장르 부분 
				if(eleSection.style.display=="block"){
					eleSection.style.display="none";
				}
				else{
					eleSection.style.display="block";
									}
				e.stopPropagation();
			},false)
		}
		function fixArticle(){
			var eleSection=document.getElementById('books1');
			eleSection.style.height="initial";

		}
		function getChangeBooks(target){
			var url="./BookLists/aBookList.js";
			getRequest(url,"change",target);
		
		}
		function getMoreBooks(){//
			var morebooks=document.getElementById("line1");//line1 만 살리고 나머진 죽이기
			var bookSelves=document.getElementById("bookSelf");//article 의 책부분들
			var url="./BookLists/moreBooks1.js";
			getRequest(url,"more",morebooks);
			bookSelves.innerHTML=morebooks.innerHTML;
		}
		function getRequest(url,what,target){
			var loadingPage=document.getElementById('loading');
			loadingPage.style.display="block";
			var BookList;
			var request = new XMLHttpRequest();
			request.open("GET" , url , true);
			request.send(null);
			request.onreadystatechange = function() { 
			    if(request.readyState === 4 && request.status === 200) {
			      	BookList = request.responseText;
				    BookList = JSON.parse(BookList);

			      	if(what === "change"){
				      	var result = makeBookElement(sBookTemplate,BookList[target.id]);
				      	replaceBooks(result);
				      	
			      	}
			      	if(what === "more"){
			      		BookList = request.responseText;
				      	BookList = JSON.parse(BookList);
				      	var result= makeBookElement(sBookTemplateMore,BookList);
				      	putBooks(result);
				      	target.insertAdjacentHTML('beforeend', result);
			      	}
			      	loadingPage.style.display="none";
				}
			}
		}
		var sBookTemplate = "<div class='up'><a href='' class='black'></a><div><img src=%imgsrc---% alt=''></div></div><div class='down'><h2><a href=''class='line'>%title---%</a></h2><span><a href='' class='left line'>%name---%</a><a href=''  class='right line'>%money---%</a></span></div>";
		var sBookTemplateMore = "<li><div class='up'><a href='' class='black'></a><div><img src=%imgsrc---% alt=''></div></div><div class='down'><h2><a href=''class='line'>%title---%</a></h2><span><a href='' class='left line'>%name---%</a><a href=''  class='right line'>%money---%</a></span></div></li>";

		function makeBookElement(sBookTemplate, aBookList){
			var result=[];
			aBookList.forEach(function(v,i,o){
				result[i]=sBookTemplate.replace("%imgsrc---%",v.imgsrc).replace("%title---%",v.titleName).replace("%name---%",v.name).replace("%money---%",v.money);
			});
			return result;
		}
		function replaceBooks(aNewBooks){
			eChildren=document.getElementById("books1").children;
			aNewBooks.forEach(function(v,i,o){
				eChildren[i].innerHTML = v;
			})
		}
		function putBooks (result) {
			var elBooks=document.getElementById("books1");
			result.forEach(function(v,i,o){
				elBooks.insertAdjacentHTML ('beforeend',v);
			})
		}