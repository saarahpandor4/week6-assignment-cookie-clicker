import { useEffect } from "react";
export default function Upgrades({ items, setItems, onUpgrade, cookieCount }) {
  useEffect(() => {
    async function getUpgrades() {
      const response = await fetch(
        "https://cookie-upgrade-api.vercel.app/api/upgrades"
      );
      const upgrades = await response.json();
      setItems(upgrades);
      //using the '...(spread operator)' creates a new object by copying the 'item' object and updating count
      const upgradesWithCount = upgrades.map((upgrade) => ({
        ...upgrade,
        count: 0,
      }));
      setItems(upgradesWithCount);
    }
    getUpgrades();
  }, [setItems]);

  return (
    <>
      {items.map((item) => (
        <div
          id="upgradesContainer"
          key={item.id}
          style={{ border: "3px solid black", padding: "5px", margin: "5px" }}
        >
          <p>Upgrade Name: {item.name}</p>
          <p>Upgrade cost: {item.cost}</p>
          <p>Upgrade Increase: {item.increase}</p>
          <p>Purchased:{item.count}</p>

          <button
            onClick={() => onUpgrade(item.id, item.cost, item.increase)}
            disabled={cookieCount < item.cost}
          >
            {cookieCount >= item.cost ? "Buy" : "Not enough cookies"}
          </button>
        </div>
      ))}
    </>
  );
}
