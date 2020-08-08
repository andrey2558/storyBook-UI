import { storiesOf } from '@storybook/vue';
import Input from './input';
import './inputStories.scss';

storiesOf('Элемент ввода input', module).add('input', () => ({
    components: { Input },
    data() {
        return {
            defaultInputValue: '',
            phoneInputValue: '',
            numberInputValue: 0,
            dateInputValue: null,
        };
    },

    render() {
        return (
            <div class="btnStories">
                <div>
                    <Input label={'default input label'} v-model={this.defaultInputValue} type={'text'} />
                    <p>Default input value: {this.defaultInputValue}</p>
                    <pre>{`<Input label={'default input label'} v-model={this.defaultInputValue} type={'text'}/>`}</pre>
                </div>

                <div>
                    <Input label={'phone input label'} v-model={this.phoneInputValue} type={'tel'} />
                    <p>Phone input value: {this.phoneInputValue}</p>
                    <pre>{`<Input label={'phone input label'} v-model={this.phoneInputValue} type={'tel'} />`}</pre>
                </div>

                <div>
                    <Input label={'Number input label'} type={'number'} v-model={this.numberInputValue} min={0} max={999} />
                    <p>Number input value: {this.numberInputValue}</p>
                    <pre>{`<Input label={'Number input label'} type={'number'} v-model={this.numberInputValue} min={0} max={999}/>`}</pre>
                </div>

                <div>
                    <Input label={'Date input label'} type={'date'} v-model={this.dateInputValue} />
                    <p>Date input value: {this.dateInputValue}</p>
                    <pre>{`  <Input label={'Date input label'} type={'date'} v-model={this.dateInputValue}/>`}</pre>
                </div>
            </div>
        );
    },
}));
