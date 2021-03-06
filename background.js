function backgroundListener(displayUrl, title, desc, account, component, bug, due, ycdesk) {
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    var contentType = 'image/jpeg';
    var b64 = screenshotUrl.substring(screenshotUrl.indexOf(",") + 1) //removes  data:image/jpeg;base64 from beginning of string
    var blob = b64toBlob(b64, contentType)

    var projID = 11300 //CONSULTING ID
    var issueID = 10401 //Software Dev type

    //Defaults provided no information
    //Component default is Quick Resposne (15527), account default is Yext (85)
    desc += "*Example* : " + displayUrl

    if(bug == true)
    {
      issueID = 1 //Bug issue type
    }

    json = JSON.stringify(createJSON(projID, issueID, title, desc, account, component, due));

    createIssue(json, blob, ycdesk);
  });
}

//Creates JSON needed to create an issue
function createJSON(proj, issue, title, desc, account, component, due){
  json =
  {
    "fields": {
      "project": {
        "id": proj,
      },
      "issuetype": {
        "id": issue,
      },
      "summary": title,
      "description": desc,
      "customfield_11000": account,
      "components": [
        {
          "id": component
        }
      ],
    }
  } ;

  if (due != "")
  {
    json["fields"].duedate = due;
  }
  if (issue == "1")
  {
    json["transition"] = {
      "id": 51 //TO DO status ID
    }
  }

  return json;
}
