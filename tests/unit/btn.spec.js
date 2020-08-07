import { mount, shallowMount } from '@vue/test-utils';
import Btn from '@/components/btn/btn.vue';

describe('Button', () => {
    it('slots', () => {
        const wrapper = mount(Btn, {
            slots: {
                default: `button text`,
                icon: `<img src="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png" alt="ads via Carbon">`,
            },
        });
        const wrapperImage = wrapper.find('img');
        const imageAttrs = wrapperImage.attributes();

        expect(wrapper.element.tagName).toMatch('BUTTON');
        expect(wrapper.text()).toMatch(`button text`);
        expect(wrapper.find('img').element.tagName).toMatch('IMG');
        expect(imageAttrs.src).toMatch('https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png');
        expect(imageAttrs.alt).toMatch('ads via Carbon');
    });

    it('success  btn', () => {
        const wrapper = mount(Btn, {
            propsData: { type: 'success', iconPosition: 'first' },
        });
        expect(wrapper.classes().includes('btn--green')).toBe(true);
        expect(wrapper.classes().includes('isError')).toBe(false);
    });

    it('error  btn', () => {
        const wrapper = mount(Btn, {
            propsData: { type: 'danger', error: 'error' },
        });

        expect(wrapper.classes().includes('btn--danger')).toBe(true);
        expect(wrapper.classes().includes('isError')).toBe(true);
    });

    it('empty type  btn', () => {
        const wrapper = mount(Btn);

        expect(wrapper.classes().includes('btn--danger')).toBe(false);
        expect(wrapper.classes().includes('btn--green')).toBe(false);
    });

    it('error type  btn', async () => {
        const wrapper = shallowMount(Btn, {
            propsData: { type: 'ASasS' },
        });

        expect(wrapper.isFunctionalComponent === true);
    });

    it('iconPosition first  btn', () => {
        const wrapper = mount(Btn, {
            propsData: { iconPosition: 'first' },
        });

        expect(wrapper.classes().includes('iconPosition-first')).toBe(true);
    });

    it('iconPosition last  btn', () => {
        const wrapper = mount(Btn, {
            propsData: { iconPosition: 'last' },
        });

        expect(wrapper.classes().includes('iconPosition-last')).toBe(true);
    });

    it('iconPosition top  btn', () => {
        const wrapper = mount(Btn, {
            propsData: { iconPosition: 'top' },
        });

        expect(wrapper.classes().includes('iconPosition-top')).toBe(true);
    });

    it('iconPosition bottom  btn', () => {
        const wrapper = mount(Btn, {
            propsData: { iconPosition: 'bottom' },
        });

        expect(wrapper.classes().includes('iconPosition-bottom')).toBe(true);
    });

    it('iconPosition empty  btn', () => {
        const wrapper = mount(Btn);
        expect(wrapper.classes().includes('iconPosition-top')).toBe(false);
        expect(wrapper.classes().includes('iconPosition-last')).toBe(true);
        expect(wrapper.classes().includes('iconPosition-first')).toBe(false);
        expect(wrapper.classes().includes('iconPosition-bottom')).toBe(false);
    });

    it('error iconPosition  btn', async () => {
        const wrapper = shallowMount(Btn, {
            propsData: { iconPosition: 'ASasS' },
        });

        expect(wrapper.classes().includes('iconPosition-top')).toBe(false);
        expect(wrapper.classes().includes('iconPosition-last')).toBe(false);
        expect(wrapper.classes().includes('iconPosition-first')).toBe(false);
        expect(wrapper.classes().includes('iconPosition-bottom')).toBe(false);
    });

    it('click event', () => {
        const Component = {
            components: { Btn },
            template: `<btn @click="$emit('click')"/>`,
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

    it('dbClick event', () => {
        const Component = {
            components: { Btn },
            template: `<btn @dblclick="$emit('dblclick')"/>`,
        };
        const onDblClick = jest.fn();
        const wrapper = mount(Component, {
            listeners: {
                dblclick: onDblClick,
            },
        });

        wrapper.trigger('dblclick');
        expect(onDblClick).toHaveBeenCalled();
    });
});
