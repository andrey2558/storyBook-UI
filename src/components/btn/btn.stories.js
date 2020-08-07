import { storiesOf } from '@storybook/vue';
import Btn from './btn';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import './buttonStories.scss';

storiesOf('Кнопки', module).add('Слоты', () => ({
    components: { Btn },
    render() {
        return (
            <div class="btnStories">
                <div>
                    <h1>Обычный и Icon слоты</h1>
                    <Btn onClick={this.action} iconPosition="top">
                        <h1>button text</h1>
                    </Btn>
                </div>

                <div>
                    <h1>Кнопка "success"</h1>
                    <Btn onClick={this.action} iconPosition="bottom" type={'success'}>
                        <h1>button text</h1>
                        <img
                            src="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png"
                            alt="ads via Carbon"
                            slot="icon"
                            style={'width:50px; height: 50px;'}
                        />
                    </Btn>
                </div>

                <div>
                    <h1>Кнопка "danger"</h1>
                    <Btn type="danger" iconPosition="first">
                        <img
                            src="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png"
                            alt="ads via Carbon"
                            slot="icon"
                            style={'width:50px; height: 50px;'}
                        />
                    </Btn>
                </div>
            </div>
        );
    },
    methods: { action: action('clicked'), link: linkTo('clicked') },
}));
