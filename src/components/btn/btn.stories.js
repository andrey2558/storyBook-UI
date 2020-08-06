import { storiesOf } from "@storybook/vue";
import Btn from "./btn";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import "./buttonStories.scss";

storiesOf("Кнопки", module).add("Слоты", () => ({
  components: { Btn },
  render() {
    return (
      <div class="btnStories">
        <div>
          <h1>Обычный и Icon слоты</h1>
          <Btn onClick={this.action}>
            <h1>Default slot</h1>
            <div slot="icon">iconSlot</div>
          </Btn>
        </div>

        <div>
          <h1>Кнопка "success"</h1>
          <Btn onClick={this.link} type="success">
            <h1>Default slot</h1>
          </Btn>
        </div>

        <div>
          <h1>Кнопка "danger"</h1>
          <Btn type="danger">
            <div slot="icon">iconSlot</div>
          </Btn>
        </div>
      </div>
    );
  },
  methods: { action: action("clicked"), link: linkTo("clicked") }
}));
