import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Add from "../views/Add";
import UseLoginContext from "../hooks/useLoginContext";
import Callback from "../views/Callback";

describe("View tests", () => {
  it("Renders Add View", () => {
    const inputTitle = "Games";
    const inputDescription = "adfg";

    const component = renderer.create(
      <UseLoginContext.Provider
        value={{
          inputTitle,
          inputDescription,
          username: "Henry",
          userID: "655e8c432fff7d8ef2a281fc",
          googleName: "Jokubas Gedminas",
          googleEmail: "jokas3@gmail.com",
        }}
      >
        <MemoryRouter>
          <Add />
        </MemoryRouter>
      </UseLoginContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("Renders Callback", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Callback />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });
});
