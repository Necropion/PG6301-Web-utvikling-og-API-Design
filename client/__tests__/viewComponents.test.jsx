import renderer, { act } from "react-test-renderer";
import UserList from "../components/view/UserList";
import Footer from "../components/view/Footer";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/view/Header";
import Navigation from "../components/view/Navigation";
import ProfileCard from "../components/view/ProfileCard";
import UseLoginContext from "../hooks/useLoginContext";

describe("View components tests", () => {
  it("Renders Footer", () => {
    const component = renderer.create(<Footer />);
    expect(component).toMatchSnapshot();
  });

  it("Renders Header", () => {
    const component = renderer.create(<Header />);
    expect(component).toMatchSnapshot();
  });

  it("Renders Navigation", () => {
    const component = renderer.create(
      <UseLoginContext.Provider
        value={{ username: "dummy", googleName: "dummy" }}
      >
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      </UseLoginContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("Renders ProfileCard", () => {
    const component = renderer.create(<ProfileCard />);
    expect(component).toMatchSnapshot();
  });

  const userList = [
    {
      username: "dummy",
    },
  ];

  const googleUserList = [
    {
      name: "dummy",
      img: "dummy",
      email: "dummy",
    },
  ];

  it("Renders UserList", () => {
    const component = renderer.create(
      <UseLoginContext.Provider value={{ userList, googleUserList }}>
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      </UseLoginContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
