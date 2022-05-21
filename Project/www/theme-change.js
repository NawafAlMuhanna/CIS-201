const button = document.querySelector(".Button-Toggle");

const theme = document.querySelector("#ThemeLink");
      button.addEventListener("click", function() {
        // Swap out the URL for the different stylesheets
        if (theme.getAttribute("href") == "LightTheme.css") {
          theme.href = "DarkTheme.css";
        } else {
          theme.href = "LightTheme.css";
        }
      });