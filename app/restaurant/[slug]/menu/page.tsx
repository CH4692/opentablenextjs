import Header from "../components/Header";
import MenuComp from "../components/MenuComp";
import RestaurantNavBar from "../components/RestaurantNavBar";

export default function Menu() {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar />
      <MenuComp />
    </div>
  );
}
