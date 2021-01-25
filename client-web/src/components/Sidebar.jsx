import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="md:w-2/5 xl:w-1/5 bg-gray-800 ">
        <div className="p-6">
          <p className="uppercase text-white text-2xl tracking-wide font-bold text-center">
            Restaurant App
          </p>
          <p className="mt-3 text-gray-500">Admin You Restaurant: </p>
          <nav className="mt-10">
            <NavLink
              exact
              to="/orders"
              activeClassName="text-yellow-500"
              className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            >
              Orders
            </NavLink>
            <NavLink
              exact
              to="/menu"
              activeClassName="text-yellow-500"
              className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            >
              Menu
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
