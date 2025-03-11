import { useEffect } from "react";

const UseEdgeScroll = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX } = event; // Track mouse X position
      const scrollSpeed = 10; // Adjust scroll speed
      const edgeThreshold = 50; // Pixels from the edge to trigger scroll

      // Get current horizontal scroll position
      const scrollLeft = window.scrollX;
      const maxScrollLeft = document.documentElement.scrollWidth - window.innerWidth;

      // Scroll Left
      if (clientX <= edgeThreshold && scrollLeft > 0) {
        window.scrollBy({ left: -scrollSpeed, behavior: "smooth" });
      }
      // Scroll Right
      else if (clientX >= window.innerWidth - edgeThreshold && scrollLeft < maxScrollLeft) {
        window.scrollBy({ left: scrollSpeed, behavior: "smooth" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null; // No UI, just logic
};

export default UseEdgeScroll;
