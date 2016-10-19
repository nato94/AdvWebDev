 function makeRequest(filename) {
            
                var promise = new Promise( httpPromise );
                
                function httpPromise(resolve, reject) {
                    var httpRequest = new XMLHttpRequest();

                     if ( !httpRequest ) {
                       reject('Giving up :( Cannot create an XMLHTTP instance');
                     }
                     
                     httpRequest.open('GET', filename);
                     httpRequest.send();
                     
                     httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
                     httpRequest.addEventListener('error', httpReject.bind(httpRequest));
                     
                     function httpResolve() {                        
                        if ( this.status >= 200 && this.status < 300 ) {
                            // Performs the function "resolve" when this.status is equal to 2xx
                            resolve(JSON.parse(this.response));
                        } else {
                            // Performs the function "reject" when this.status is different than 2xx
                            reject(this.statusText);
                        }                          
                     }
                     
                     function httpReject() {
                         reject(this.statusText);
                     }

                }
                

                // Return the promise
                return promise;
            } //end makeRequest
            
            
            var callback = {
              success: function(data) {
                console.log(1, 'success', data);
                getData(data);
                
              },
              error: function(data) {
                console.log(2, 'error', data);
              }
            };
            
            makeRequest('data/users.json').then(callback.success, callback.error);
            
       function getData(data){
           //stringify and parse the data passed in
           var string = JSON.stringify(data);
           var json = JSON.parse(string);
           
           //function to display the list of names in the JSON Object
           displayList('ul.users', json.users);
       }//end getData    
        
        function displayList(selector, list) {
                var dom = document.querySelector(selector);
                /* this document fragment is just for performance 
                 * We create all the elements to add to the page
                 * add them to the fragment, then add the fragment to
                 * the page.  Much faster than just adding all the
                 * elements to the page one at a time
                 * 
                 */
                var docfrag = document.createDocumentFragment();
                
                /* Loops through the json object and gets all the first names to display in the list*/
                for(var i=0; i< list.length; i++){
                    /* you can use the creaeElement tag to create any HTML element you want */
                    var li = document.createElement("li");            
                    li.textContent = list[i].name.first + " " + list[i].name.last;
                    //console.log(list[i]);
                    /* you can set any attribute using the function below for any Created element */
                    li.setAttribute('class', 'link');
                    /*you can even attach events to the element */
                    li.addEventListener('click', displayContent.bind(null, 'article', list[i]));
                    docfrag.appendChild(li);
                }//end for loop
                
                /* after the fragment is completed we can add it to the page */
                dom.appendChild(docfrag);
            }//end displayList
            
            function displayContent(selector, item) {
                var dom = document.querySelector(selector);
                var docfrag = document.createDocumentFragment();
                
                /* remove any child elements */
                while (dom.firstChild) {
                    dom.removeChild(dom.firstChild);
                }   
                
                //make request to get individual user data
                var id = item._id + ".json";
                
                var callback2 = {
                success: function(data) {
                console.log(1, 'success', data);
                document.querySelector("figure").innerHTML = "";
                displayPic(data.picture);
                docfrag.appendChild( createParagraphElement('Full Name: ', data.name.first + " " + data.name.last) );
                docfrag.appendChild( createParagraphElement('Company: ', data.company) );
                docfrag.appendChild( createParagraphElement('Email: ', data.email) );
                docfrag.appendChild( createParagraphElement('Phone: ', data.phone) );
                docfrag.appendChild( createParagraphElement('Address: ', data.address) );
                docfrag.appendChild( createParagraphElement('Registered: ', data.registered) );
                docfrag.appendChild( createParagraphElement('Age: ', data.age) );
                docfrag.appendChild( createParagraphElement('Eye Color: ', data.eyeColor) );
                docfrag.appendChild( createParagraphElement('Greeting: ', data.greeting) );
                docfrag.appendChild( createParagraphElement('Favorite Fruit: ', data.favoriteFruit) );
                docfrag.appendChild( createParagraphElement('Balance: ', data.balance) );
                docfrag.appendChild( createParagraphElement('About: ', data.about) );
                dom.appendChild(docfrag);
                },
                error: function(data) {
                  console.log(2, 'error', data);
                }
                };
                
                makeRequest('data/' + id).then(callback2.success, callback2.error);
               
            }//end displayContent
            
             /* custom function to generate a template for our view */
            function createParagraphElement(label, text) {
                var pTag = document.createElement('p'),
                    strongTag = document.createElement('strong'),
                    strongText = document.createTextNode(label),
                    pText = document.createTextNode(text);
          
                    strongTag.appendChild(strongText);
                    pTag.appendChild(strongTag);  
                    pTag.appendChild(pText);  
                    return pTag;
            }//end createParagraphElement
            
            function displayPic(image) {
                
                var imageTag;
                dom = document.querySelector('figure');
                //if(imageTag && typeof imageTag !== 'undefined' ){
                   imageTag = document.createElement('img');
                //}
                imageTag.src = "img/" + image;
                dom.appendChild(imageTag);
            }
            
              
            