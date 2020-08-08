export default {
    methods: {
        clearHtmlComments(string) {
            if (typeof string === 'string') {
                return string.replace(/<!--.*-->/gmu, '');
            }
        },
    },
};
