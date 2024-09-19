import renderer from "react-test-renderer";
import ChatAddButton from "../components/chat/ChatAddButton";
import ChatDelete from "../components/chat/ChatDelete";
import ChatEdit from "../components/chat/ChatEdit";
import { MemoryRouter } from "react-router-dom";
import UseLoginContext from "../hooks/useLoginContext";

describe("Chat components tests", () => {
  it("Renders Add chat button", () => {
    const component = renderer.create(
      <MemoryRouter>
        <ChatAddButton />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });

  const chatList = [
    {
      title: "dummy",
      description: "dummy",
      user: "dummy",
    },
  ];

  it("Renders Edit chat buttons for admin", () => {
    const component = renderer.create(
      <UseLoginContext.Provider value={{ userType: "admin" }}>
        <MemoryRouter>
          <ChatEdit c={chatList} />
        </MemoryRouter>
      </UseLoginContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("Renders Edit chat buttons for normal user", () => {
    const component = renderer.create(
      <UseLoginContext.Provider value={{ userType: undefined }}>
        <MemoryRouter>
          <ChatEdit c={chatList} />
        </MemoryRouter>
      </UseLoginContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
