import renderer from "react-test-renderer";
import LoginGoogleOpenID from "../components/login/LoginGoogleOpenID";

describe("Login components tests", () => {
  it("Renders Google login button", () => {
    const component = renderer.create(<LoginGoogleOpenID />);
    expect(component).toMatchSnapshot();
  });
});
