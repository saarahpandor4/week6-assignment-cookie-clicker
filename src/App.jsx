import "./App.css";
import { useEffect, useState } from "react";
import Upgrades from "./components/Upgrades";

export default function App() {
  //we need 2 states to store the cookies and cookiesPerSecond
  const [cookiesPerSecond, setCookiesPerSecond] = useState(1);
  const [cookieCount, setCookieCount] = useState(0);
  const [items, setItems] = useState([]);

  function handleUpgradePurchase(upgradeId, cost, increase) {
    if (cookieCount >= cost) {
      // Subtract the cost from total cookies
      setCookieCount((prevCount) => prevCount - cost);

      // Increase CPS by the 'increase' value of the upgrade
      setCookiesPerSecond((prevCPS) => prevCPS + increase);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === upgradeId ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  }

  function handleCookieCount() {
    setCookieCount(cookieCount + 1);
  }

  function handleReset() {
    setCookieCount(0);
    setCookiesPerSecond(1);
  }

  useEffect(() => {
    const cookiesPerSecondInterval = setInterval(() => {
      console.log("Button has been pressed");
      setCookieCount((currentCookies) => currentCookies + cookiesPerSecond);
    }, 1000);

    return () => {
      clearInterval(cookiesPerSecondInterval);
    };
  }, [cookiesPerSecond]);

  return (
    <>
      <h1>Cookie Clicker</h1>
      <img
        id="cookies"
        src="https://media.discordapp.net/attachments/1284140237794312314/1292515894777614336/Cookie.png?ex=670404bb&is=6702b33b&hm=0b7c2a23bfbc1fc926f8cb787776a31b6907add97348ab9712aab47b5aace28f&=&format=webp&quality=lossless&width=936&height=936"
        height="250"
        width={"250"}
        display="center"
        alt="cookie"
        style={{ cursor: "pointer" }}
        onClick={handleCookieCount}
      ></img>
      <h2>Count is {cookieCount}</h2>
      <h3>CPS:{cookiesPerSecond}</h3>

      <Upgrades
        items={items}
        setItems={setItems}
        onUpgrade={handleUpgradePurchase}
        cookieCount={cookieCount}
      />

      <Upgrades items={items} setItems={setItems} />
      <button onClick={handleReset} style={{ marginTop: "20px" }}>
        Reset
      </button>
    </>
  );
}
