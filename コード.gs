function doGet(e) {
  doPost(e);
}

function doPost(e) {

  var jsonString = e.postData.getDataAsString();
  var data = JSON.parse(jsonString);

  if (!e) {

    //for Test. Backlogからは以下のパラメータで飛んできます。
    data = {
      "created": "2017-09-27T02:15:30Z",
      "project": {
        "archived": false,
        "projectKey": "TEST",
        "name": "TestProject",
        "chartEnabled": false,
        "id": 100,
        "subtaskingEnabled": false
      },
      "id": 10,
      "type": 1,
      "content": {
        "summary": "test issue",
        "key_id": 100,
        "customFields": [],
        "dueDate": "",
        "description": "test description",
        "priority": {
          "name": "",
          "id": null
        },
        "resolution": {
          "name": "",
          "id": null
        },
        "actualHours": null,
        "issueType": {
          "color": "null",
          "name": "Bug",
          "displayOrder": null,
          "id": 400,
          "projectId": null
        },
        "milestone": [
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "prototype release",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          },
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "alpha release",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          },
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "beta release",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          },
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "product release",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          }
        ],
        "versions": [
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "Version0.1",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          },
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "Version0.2",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          },
          {
            "archived": "false",
            "releaseDueDate": "null",
            "name": "Version1.0",
            "displayOrder": null,
            "description": "",
            "id": null,
            "projectId": null,
            "startDate": "null"
          }
        ],
        "parentIssueId": null,
        "estimatedHours": null,
        "id": 100,
        "assignee": null,
        "category": [
          {
            "name": "Category1",
            "displayOrder": null,
            "id": null
          },
          {
            "name": "Category2",
            "displayOrder": null,
            "id": null
          }
        ],
        "startDate": "",
        "status": {
          "name": "In Progress",
          "id": 2
        }
      },
      "notifications": [],
      "createdUser": {
        "nulabAccount": {
          "nulabId": "xxxxxx",
          "name": "wataru-kurashima",
          "uniqueId": "wataru-kurashima"
        },
        "name": "wataru-kurashima",
        "mailAddress": null,
        "id": 85254,
        "roleType": 1,
        "userId": null
      }
    }
  }

//  console.log(e);
  
  var issue_key = data.project.projectKey + "-" + data.content.key_id;
  var title = data.content.summary;
  var description = data.content.description;
  var priority = data.content.priority.name;
  var url = "https://xxxxxx.backlog.jp/view/" + issue_key;
  
  var text = issue_key + " " + title + "\n" + url + "\n" + description;

  postSlack(text, priority);
  return null;
}

function postSlack(text, priority) {
  if (text == []) {
    return;
  }

  var postChannelId = "Cxxxxxxx"; 
  var color = "#000000"; 
  switch(priority) {
    case "高":
    　　　　text = text + "\n@here";
      var color = "#FF0000";
      break;
    case "中":
      var color = "#FFC400";
      break;
  }

  var payload = {
    "channel": postChannelId,
    "username": "BklgNew",
    "icon_emoji": ":new:",
    "link_names": 1,
    "unfurl_media": true,
    "attachments": [
        {
            "text": text,
            "color": color,
            "mrkdwn_in": ["text"]
        }
    ]
  };
  
  var option = {
    "method": "POST",
    "contentType": "text/json",
    "payload" : JSON.stringify(payload)
  }
  
  var response = UrlFetchApp.fetch("https://hooks.slack.com/services/xxxxxxxxxx", option);
  Logger.log(response);
}