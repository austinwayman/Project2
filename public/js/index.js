function createDiv() {



    var data = {
        id:"2",
        Name: "Dodo",
        City: "San Diego",
        State: "Arizona",
        BedroomNumber: 4,
        BathroomNumber: 6,
        Description: "Nice",
        PricePerNight: 300,
        Img1: "google",
        Img2: "yahoo",
        Img3: "bing",
        StartDate: "20180101",
        EndDate: "20180130"
    }
    
    var $newDiv = $("<div class='col-md-4 featured-responsive'>");
    var featuredWrap = $("<div class='featured-place-wrap'>");
    var newImage = $("<img>")
    newImage.attr("src", "images/phoenix1exterior.png");
    newImage.attr("class", "img-fluid");
    var link1 = $("<a>")
      link1.attr("href", "#");

    link1.append(newImage);
    $newDiv.append(featuredWrap);

    var cardBox = $("<div class='featured-title-box'>");
    var cardHeader = $("<h6>")
      cardHeader.text(data.Name);

    cardBox.append(cardHeader);
    

    var bedroomLine = $("<p>")
      bedroomLine.text(data.BedroomNumber + " Bedroom" + " |");
    
    var bathroomLine = $("<p>")
      bathroomLine.html(`&nbsp; ${data.BathroomNumber} Bathroom`);

    cardBox.append(bedroomLine)
    cardBox.append(bathroomLine)

    
    var lists = $("<ul>")

    var item1=$("<li>")
    var span1=$("<span>")
    var info=$("<p>")
      span1.addClass("icon-location-pin")
      item1.append(span1)
      info.text(data.City + ", " + data.State)
      item1.append(info)


    lists.append(item1);

    var item2=$("<li>")
    var span2=$("<span>")
    var info2=$("<p>")
      span2.addClass("icon-wallet")
      item2.append(span2)
      info2.text("$" + data.PricePerNight + "/night")
      item2.append(info2)

    lists.append(item2);

    

   cardBox.append(lists);



    var moreInfoButton = $("<div class='bottom-icons'>")
    var moreInfoButtonOther = $("<div class='closed-now'>")
      moreInfoButton.append(moreInfoButtonOther);
      moreInfoButtonOther.text("SEE MORE INFO");
      
   cardBox.append(moreInfoButton);
    


    link1.append(cardBox);
    featuredWrap.append(link1);
    $newDiv.append(featuredWrap);
    

  $("#created").append($newDiv)

};


createDiv();

