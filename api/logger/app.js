// quick & dirty solution based on http://js-grid.com

$(function(){
  const logs = [
    {},
    { level: "DEBUG", label: "DEBUG", color: "rgb(196, 196, 196);" },
    { level: "INFO", label: "INFO", color: "rgb(155, 204, 228);" },
    { level: "WARN", label: "WARN", color: "rgb(237, 179, 89)" },
    { level: "ERROR", label: "ERROR", color: "rgb(227, 85, 76)" },
  ]
  const logColor = {
    "DEBUG": "rgb(196, 196, 196);",
    "INFO": "rgb(155, 204, 228);",
    "WARN": "rgb(237, 179, 89)",
    "ERROR": "rgb(227, 85, 76)",
  }

  const grid = $("#grid").jsGrid({
    width: "100%",
    // height: "90%",
    pageSize: 500,
    filtering: true,
    editing: false,
    sorting: false,
    paging: true,
    autoload: true,
    loadMessage: "Fetching latest logs...",

    fields: [
      { 
        name: "date",
        type: "text",
        width: 50,
        itemTemplate(value){ return new Date(value).toLocaleString() }
      },
      {
        name: "level",
        type: "select",
        width: 40,
        items: logs,
        valueField: "level",
        textField: "label",
        itemTemplate(value){ 
          const el = $(`<span style="color: ${logColor[value]}">${value}</span>`)
          // debugger
          return el
        }
      },
      {
        name: "account", type: "text", width: 40
      },
      {
        name: "content", type: "text", width: 150
      },
    ],

    controller: {
      loadData: function(filters) {
        const criteria = Object.fromEntries(
          Object.entries(filters)
            .filter(([key, value]) => Boolean(value))
        )
        if (criteria.content){
          criteria.content_like = criteria.content
          delete criteria.content;
        }

        return $.ajax({
          type: "GET",
          url: "/logs",
          data: criteria
        }).then(function(response){
            return response.sort((log1, log2) => {
              const diff = new Date(log2.date) - new Date(log1.date)
              return diff
            })
        })
      },
    },
  });

  setInterval(() => {
    $("#grid").jsGrid("loadData")
  }, 5000)
});
