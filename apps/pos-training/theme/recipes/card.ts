import { defineSlotRecipe } from "@pandacss/dev";

export const CardRecipe = defineSlotRecipe({
  className: "Card",
  slots: ["root", "avatar", "badge", "name", "stats", "button"],
  base: {
    root: {
      height: "100%",
      border: "1px solid",
      borderRadius: "lg",
      p: "6",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "4",
      _hover: {
        boxShadow:
          "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
    avatar: {
      borderRadius: "full",
      width: "80px",
      height: "80px",
      objectFit: "cover",
      position: "relative",
    },
    badge: {
      position: "absolute",
      bottom: "-2",
      right: "-2",
      px: "2",
      py: "1",
      fontSize: "xs",
      borderRadius: "md",
    },
    name: {
      fontWeight: "semibold",
      fontSize: "lg",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "4",
      fontSize: "sm",
      alignItems: "center",
    },
    button: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "2",
      px: "4",
      py: "2",
      fontSize: "sm",
      border: "1px solid",
      borderRadius: "md",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  },
  variants: {
    theme: {
      light: {
        root: {
          bg: "card.DEFAULT",
          borderColor: "border",
          color: "foreground",
        },
        badge: {
          bg: "primary.DEFAULT",
          color: "primary.foreground",
        },
        name: {
          color: "foreground",
        },
        stats: {
          color: "muted.foreground",
        },
        button: {
          bg: "background",
          color: "foreground",
          borderColor: "border",
          _hover: {
            bg: "accent.DEFAULT",
          },
        },
      },
      dark: {
        root: {
          bg: "gray.500",
          borderColor: "gray.700",
          color: "white",
        },
        badge: {
          bg: "blue.600",
          color: "white",
        },
        name: {
          color: "white",
        },
        stats: {
          color: "gray.400",
        },
        button: {
          color: "black",
          borderColor: "gray.600",
          _hover: {
            bg: "gray.600",
          },
        },
      },
    },
  },
  defaultVariants: {
    theme: "light",
  },
});
