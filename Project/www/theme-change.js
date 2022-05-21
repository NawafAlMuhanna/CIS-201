const btn = document.querySelector(".ButtonToggle");

const theme = document.querySelector("#ThemeLink");
      btn.addEventListener("click", function() {
        // Swap out the URL for the different stylesheets
        if (theme.getAttribute("href") == "LightTheme.css") {
          theme.href = "DarkTheme.css";
        } else {
          theme.href = "LightTheme.css";
        }
      });