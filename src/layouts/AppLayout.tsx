import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { Keyboard } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";
import logoFooter from "@/assets/images/logo-footer.png";
import { Header } from "./components/Header";

function AppLayout() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const keyboardListenersRef = useRef<{ remove: () => Promise<void> }[]>([]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let mounted = true;

    void (async () => {
      try {
        const showListener = await Keyboard.addListener("keyboardWillShow", () => {
          scrollPositionRef.current = scrollContainerRef.current?.scrollTop ?? 0;
        });
        const hideListener = await Keyboard.addListener(
          "keyboardDidHide",
          () => {
            requestAnimationFrame(() => {
              setTimeout(() => {
                if (mounted && scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTop =
                    scrollPositionRef.current;
                }
              }, 150);
            });
          }
        );
        keyboardListenersRef.current = [showListener, hideListener];
      } catch {
        // Keyboard plugin not available (e.g. in browser)
      }
    })();

    return () => {
      mounted = false;
      keyboardListenersRef.current.forEach((l) => l.remove());
      keyboardListenersRef.current = [];
    };
  }, []);

  return (
    <main className="h-screen flex flex-col bg-default overflow-hidden">
      <Header />
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto"
      >
        <Outlet />
      </div>
      <footer className="flex justify-center">
        <img
          src={logoFooter}
          alt="Logo Footer"
          className="h-10 sm:h-14 w-auto"
        />
      </footer>
    </main>
  );
}

export default AppLayout;
