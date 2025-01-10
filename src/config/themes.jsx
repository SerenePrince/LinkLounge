const THEMES = (theme) => {
  switch (theme) {
    case "dark":
      document.documentElement.style.setProperty("--primary-color", "#121212"); // Dark background
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#1F1F1F"
      ); // Card color
      document.documentElement.style.setProperty("--tertiary-color", "#3A3A3A"); // Button color
      document.documentElement.style.setProperty("--text-color", "#E0E0E0"); // Text color
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#757575"
      ); // Hover effect
      break;

    case "light":
      document.documentElement.style.setProperty("--primary-color", "#FFFFFF"); // White
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#E6E6E6"
      ); // Light grey
      document.documentElement.style.setProperty("--tertiary-color", "#CCCCCC"); // Medium grey
      document.documentElement.style.setProperty("--text-color", "#1A1A1A"); // Almost black
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#B0B0B0"
      ); // Muted grey
      break;

    case "ocean":
      document.documentElement.style.setProperty("--primary-color", "#001F2D"); // Deep ocean blue
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#014D66"
      ); // Ocean teal
      document.documentElement.style.setProperty("--tertiary-color", "#018E92"); // Bright sea green
      document.documentElement.style.setProperty("--text-color", "#E0F4F6"); // Light mist
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#00A1A7"
      ); // Vibrant aqua
      break;

    case "forest":
      document.documentElement.style.setProperty("--primary-color", "#2C3E4F"); // Forest shadow
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#2B6B59"
      ); // Moss green
      document.documentElement.style.setProperty("--tertiary-color", "#4C8A64"); // Fern green
      document.documentElement.style.setProperty("--text-color", "#E5EAD4"); // Offwhite
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#73A788"
      ); // Soft green
      break;

    case "party":
      document.documentElement.style.setProperty("--primary-color", "#1A1A2E"); // Nighttime backdrop
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#FF3E7C"
      ); // Neon pink
      document.documentElement.style.setProperty("--tertiary-color", "#6B23D3"); // Deep purple
      document.documentElement.style.setProperty("--text-color", "#FFFFFF"); // White
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#FFC93C"
      ); // Neon yellow
      break;

    case "sunset":
      document.documentElement.style.setProperty("--primary-color", "#2A2D37"); // Twilight sky
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#FF8C42"
      ); // Orange glow
      document.documentElement.style.setProperty("--tertiary-color", "#FF3D68"); // Bold pink
      document.documentElement.style.setProperty("--text-color", "#FFFFFF"); // Soft white
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#FFB86F"
      ); // Warm light
      break;

    case "desert":
      document.documentElement.style.setProperty("--primary-color", "#E3DCC8"); // Sandy beige
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#D4A056"
      ); // Burnt sand
      document.documentElement.style.setProperty("--tertiary-color", "#A97F4F"); // Earthy tone
      document.documentElement.style.setProperty("--text-color", "#4E463A"); // Dark brown
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#FFCC89"
      ); // Sunset gold
      break;

    case "lavender":
      document.documentElement.style.setProperty("--primary-color", "#EFE2FF"); // Light lavender
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#D7ABDD"
      ); // Soft purple
      document.documentElement.style.setProperty("--tertiary-color", "#C59DD6"); // Lavender mist
      document.documentElement.style.setProperty("--text-color", "#3A2745"); // Deep plum
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#A47BBF"
      ); // Muted lavender
      break;

    case "space":
      document.documentElement.style.setProperty("--primary-color", "#0E0E2D"); // Outer space
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#21254A"
      ); // Deep nebula
      document.documentElement.style.setProperty("--tertiary-color", "#4A90A4"); // Cyan glow
      document.documentElement.style.setProperty("--text-color", "#B3BACF"); // Stardust silver
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#5D79A2"
      ); // Star shimmer
      break;

    case "tropical":
      document.documentElement.style.setProperty("--primary-color", "#3A9E8F"); // Tropical green
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#FFC857"
      ); // Bright yellow
      document.documentElement.style.setProperty("--tertiary-color", "#FF6F91"); // Coral pink
      document.documentElement.style.setProperty("--text-color", "#1B3A30"); // Deep green
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#FFD27F"
      ); // Warm glow
      break;

    case "autumn":
      document.documentElement.style.setProperty("--primary-color", "#442C2E"); // Deep crimson
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#B3593A"
      ); // Autumn orange
      document.documentElement.style.setProperty("--tertiary-color", "#7A5331"); // Rustic brown
      document.documentElement.style.setProperty("--text-color", "#F5CBA7"); // Pale peach
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#FF9747"
      ); // Maple leaf
      break;

    default:
      document.documentElement.style.setProperty("--primary-color", "#012840"); // Default primary
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#025373"
      ); // Default secondary
      document.documentElement.style.setProperty("--tertiary-color", "#03738C"); // Default accent
      document.documentElement.style.setProperty("--text-color", "#F4F9F9"); // Default text
      document.documentElement.style.setProperty(
        "--highlight-color",
        "#96D2D9"
      ); // Default highlight
      break;
  }
};

export default THEMES;
