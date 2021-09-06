global.fetch = require("cross-fetch");
//import fetch from 'cross-fetch';


     function retrieve(options){    
        var url = "http://localhost:3000/records";
        var page = 0;
        if(typeof(options.page) != "undefined")
            page = options.page;
        else
            page = 1;

        colors = options.colors;
       
        url = geturl(url,page,colors);
        console.log("URL: " + url);
        return new Promise((resolve, reject) => { 
            fetch(url)
            .then(response => {

                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                };
                return response.json();
            }) 
            .then(data => {
                console.log(data);   
                
                var ids = [];
                var open = [];
                var closedPrimaryCount = 0;
                var pages = [];
                var pageno = 0;
                var nextPage = null;
                var prevPage = null; 
                var primary = ['red','blue','yellow'];
                var currentPage = [];
               
                
                data.map((item,index) => {
                    //var isPrimary = false;
                    if(index == 0)
                        pages[pageno] = [];
                 /*  if(!ids.includes(item.id))
                        ids.push(item.id);
                   if(item.disposition == "open"){                        
                        primary.includes(item.color) ? isPrimary = true : isPrimary = false;
                        item.isPrimary = isPrimary;
                        open.push(item);
                    }
                    if(item.disposition == "closed")
                        closedPrimaryCount++;
                        */
                    
                    if(index % 10 != 0 || index == 0){
                        pages[pageno].push(item);
                    }
                    else if(index % 10 == 0 && index != 0){
                        pageno++;
                        pages[pageno] = [];
                        pages[pageno].push(item);
                    }
                });
                console.log("Pages",pages);
                console.log("Page No",page);
                if(pages.length > 0 && page <= pages.length){ 

                    if(page == 1)
                    currentPage = pages[0];
                    else
                    currentPage = pages[page-1];

                    console.log("CurrentPage: ",currentPage);
                    if(typeof(pages[page-2]) != "undefined" && pages[page-2].length > 0)
                        prevPage = page-1;

                    if(typeof(pages[page]) != "undefined" && pages[page].length > 0)
                        nextPage = page+1;
                
                    if(typeof(currentPage) != "undefined"){
                        currentPage.map((item,index) => {
                            var isPrimary = false;
                            if(!ids.includes(item.id))
                                ids.push(item.id);
                            if(item.disposition == "open"){                        
                                primary.includes(item.color) ? isPrimary = true : isPrimary = false;
                                item.isPrimary = isPrimary;
                                open.push(item);
                            }
                            if(item.disposition == "closed")
                                {                                                          
                                    primary.includes(item.color) ? isPrimary = true : isPrimary = false;
                                    item.isPrimary = isPrimary;
                                    closedPrimaryCount++;
                                }
                                
                        });
                    }
                
                    let payload = {
                        "ids": ids,
                        "open": open,
                        "closedPrimaryCount": closedPrimaryCount,
                        "previousPage": prevPage,
                        "nextPage": nextPage
                    }
                    //console.log(payload);
                
                    return resolve(payload);
                    }
                else if(pages.length == 0){

                }
                
              
            })
            .catch(err => {
                console.error(err);
            });
    });
      
}

function geturl(url,page=0,colors=[]) {
    var offset = 0;
    limit = page*10-10;

    if(parseInt(limit) > 0 || parseInt(offset) > 0 || colors.length > 0){
        url = url + '?';
    }
   // if(parseInt(limit) > 0){
  //      url = url + 'limit=' + limit.toString();
  //  }

    url = url + '&offset=' + offset.toString();

    if(colors.length > 0){
        for(var i=0;i<colors.length;i++){
            url = url + '&color[]=' + colors[i].toString();
        }
    }
    return url;

}
         
// Your retrieve function plus any additional functions go here ...
module.exports = retrieve; 
//export default retrieve;