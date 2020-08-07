import { mount } from '@vue/test-utils';
import Btn from '@/components/btn/btn.vue';

describe('Button', () => {
    it('success btn', () => {
        const wrapper = mount(Btn, {
            propsData: { type: 'success', iconPosition: 'first', error: { name: 'someErrorName' } },
            slots: {
                default: `button text`,
                icon: `<img src="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png" alt="ads via Carbon">`,
            },
        });

        const wrapperClasses = wrapper.classes();
        const wrapperImage = wrapper.find('img');
        const imageAttrs = wrapperImage.attributes();

        expect(wrapper.element.tagName).toMatch('BUTTON');
        expect(wrapper.text()).toMatch(`button text`);
        expect(wrapper.find('img').element.tagName).toMatch('IMG');
        expect(imageAttrs.src).toMatch('https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png');
        expect(imageAttrs.alt).toMatch('ads via Carbon');
        expect(wrapperClasses.includes('btn--green')).toBe(true);
        expect(wrapperClasses.includes('isError')).toBe(true);
        expect(wrapperClasses.includes('iconPosition-first')).toBe(true);
    });

    it('click event', () => {
        const Component = {
            components: { Btn },
            template: `<Btn v-on:click="$emit('click')"/>`,
        };
        const onClick = jest.fn();
        const wrapper = mount(Component, {
            listeners: {
                click: onClick,
            },
        });

        wrapper.trigger('click');
        expect(onClick).toHaveBeenCalled();
    });
});
