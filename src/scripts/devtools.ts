import debounce from "lodash-es/debounce";

function main() {
  chrome.devtools.panels.elements.createSidebarPane(
    "My Sidebar",
    function (sidebar) {}
  );

  chrome.devtools.panels.create(
    "My Panel",
    "tab.png",
    "Panel.html",
    function (panel) {
      // code invoked on panel creation
    }
  );
}

main();
