<script>
    import sanitize from '../../mixins/sanitize';
    import Counter from '../counter/counter';
    import MaskedInput from 'vue-text-mask';
    import 'vue2-datepicker/index.css';

    export default {
        name: 'CustomInput',
        mixins: [sanitize],
        components: { Counter, MaskedInput },
        props: {
            label: {
                type: String,
                default() {
                    return '';
                },
            },
            readonly: {
                type: Boolean,
                default() {
                    return false;
                },
            },
            error: {
                default() {
                    return null;
                },
            },
            value: {
                required: true,
            },
            type: {
                type: String,
                default() {
                    return 'text';
                },
                validator(value) {
                    return ['text', 'tel', 'file', 'number', 'date'].includes(value) === true;
                },
            },
            name: {
                type: String,
                default() {
                    return '';
                },
            },
            placeholder: {
                type: String,
                default() {
                    return '';
                },
            },
            mask: {
                default() {
                    return "'+' , /7/, '(', /[1-9]/, /\\d/, /\\d/, ')', ' ', /\\d/, /\\d/, /\\d/, '-', /\\d/, /\\d/, /\\d/, /\\d/";
                },
            },
            required: {
                type: Boolean,
                default() {
                    return false;
                },
            },
            accept: {
                type: String,
                default() {
                    return '';
                },
            },
            multiple: {
                type: Boolean,
                default() {
                    return false;
                },
            },
            min: {
                type: Number,
                default() {
                    return 0;
                },
            },
            max: {
                type: Number,
                default() {
                    return Number.MAX_SAFE_INTEGER;
                },
            },
        },
        mounted() {
            if (this.mask) {
                this.currMask = ('' + this.mask).split(',').map(item => {
                    if (/\/.*?\//.test(item)) {
                        item = new RegExp(
                            item
                                .trim()
                                .replace(/^\//, '')
                                .replace(/\/$/, '')
                        );
                    } else {
                        item = item.replace(/\s/g, '').replace(/'/g, '');
                    }

                    if (item === '') {
                        item = ' ';
                    }
                    return item;
                });
            }
        },
        watch: {
            propValue() {
                if (this.propValue !== this.curValue && this.type !== 'file') {
                    this.curValue = this.propValue;
                }
            },

            getValue() {
                if (this.propValue !== this.curValue && this.type !== 'file') {
                    this.curValue = this.propValue;
                }
            },
        },
        data() {
            return {
                isFocused: false,
                curValue: this.value,
                currMask: null,
                fileValue: null,
                lang: {
                    days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    pickers: ['Следующие 7 дней', 'Следующие 30 дней', 'Предидущие 7 дней', 'Предидущие 30 дней'],
                    placeholder: {
                        date: '',
                        dateRange: '',
                    },
                },
            };
        },
        methods: {
            focus() {
                this.isFocused = true;
                this.$emit('focus');
                this.$emit('clearError');
            },
            blur(e) {
                setTimeout(() => {
                    this.isFocused = false;
                }, 150);
                this.curValue = e;
                this.$emit('blur', e);
            },
            input(e) {
                this.$emit('input', this.clearHtmlComments(e));
            },
            getLabel(label) {
                if (label) {
                    return <span class="input__labelText">{label}</span>;
                }
            },
            getError(error) {
                if (error) {
                    return (
                        <p class="input__errorMessage" title={error}>
                            {error}
                        </p>
                    );
                }
            },
            counterChanged(e) {
                this.curValue = e;
                this.$emit('input', JSON.parse(JSON.stringify(this.curValue)));
                this.$emit('blur', JSON.parse(JSON.stringify(this.curValue)));
                this.$emit('clearError');
            },
            async uploadFile(e) {
                const fileLoader = async file => {
                    return await new Promise((resolve, reject) => {
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            resolve(reader.result);
                        };
                        reader.onerror = () => {
                            reject(reader.error);
                        };
                    });
                };

                let files = e.target?.files;
                const reader = new FileReader();
                //let filesName = '';
                let fileValues = [];
                for (let i = 0; i <= files.length; i++) {
                    if (files[i]) {
                        //      filesName += `${JSON.stringify(files[i].name)}, `;
                        let currFile = await fileLoader(files[i]);
                        fileValues.push(currFile);
                    }
                }

                this.fileValue = e.target?.value;
                if (fileValues) {
                    this.$emit('input', fileValues);
                }
            },
        },
        computed: {
            getValue: {
                get() {
                    if (this.curValue) {
                        return this.curValue;
                    } else {
                        return '';
                    }
                },

                set() {
                    //
                },
            },
            propValue() {
                if ([null, undefined].includes(this.value) === false) {
                    return this.value;
                }

                return null;
            },
            getClasses() {
                let className = '';
                if (this.error) {
                    className += 'isError ';
                }
                if (this.isFocused && !this.error) {
                    className += 'isSuccess ';
                }
                return className;
            },
        },
        render() {
            return (
                <div class={`input ${this.getClasses}`} onClick={() => this.$emit('click')}>
                    {!['tel', 'number', 'file'].includes(this.type) && (
                        <label>
                            {this.getLabel(this.label)}
                            <div class="input__wrapper">
                                <input
                                    class="input__input"
                                    type={this.type}
                                    name={this.name}
                                    placeholder={this.placeholder}
                                    value={this.curValue}
                                    readonly={this.readonly}
                                    autocomplete="off"
                                    onInput={e => this.input(e.target.value)}
                                    onFocus={() => this.focus()}
                                    onBlur={e => this.blur(e.target.value)}
                                    onChange={() => this.$emit('change')}
                                />
                            </div>
                            <transition name="fade">{this.getError(this.error)}</transition>
                        </label>
                    )}
                    {this.type === 'tel' && this.currMask && (
                        <label>
                            {this.getLabel(this.label)}
                            <div class="input__wrapper">
                                <client-only>
                                    <masked-input
                                        type="text"
                                        name={this.name}
                                        class="input__input"
                                        v-model={this.curValue}
                                        mask={this.currMask}
                                        guide={true}
                                        placeholderChar="_"
                                        keepCharPositions={false}
                                        onInput={e => {
                                            this.input(e);
                                        }}
                                        onFocus={() => this.focus()}
                                        onBlur={() => {
                                            this.isFocused = false;
                                            this.blur(this.curValue);
                                        }}
                                    />
                                </client-only>
                            </div>
                            <transition name="fade">{this.getError(this.error)}</transition>
                        </label>
                    )}
                    {this.type === 'number' && (
                        <div>
                            {this.getLabel(this.label)}
                            <counter
                                min={this.min}
                                max={this.max}
                                quantity={this.curValue}
                                onChange={e => this.counterChanged(e)}
                                required={this.required}
                                disabled={this.readonly}
                            />
                            {this.getError(this.error)}
                        </div>
                    )}
                    {this.type === 'file' && (
                        <div>
                            <label class="input__wrapper">
                                {this.getLabel(this.label)}

                                <input
                                    class="input__input"
                                    type={this.type}
                                    name={this.name}
                                    placeholder={this.placeholder}
                                    accept={this.accept}
                                    multiple={this.multiple}
                                    value={this.fileValue}
                                    readonly={this.readonly}
                                    autocomplete="off"
                                    onChange={e => this.uploadFile(e)}
                                />
                            </label>
                            <transition name="fade">{this.getError(this.error)}</transition>
                        </div>
                    )}
                    {this.type === 'date' && (
                        <div>
                            <datePicker
                                value={this.curValue}
                                onInput={e => {
                                    this.$emit('clearError');
                                    this.curValue = e;
                                    this.update();
                                }}
                                input-attr={{ id: 'datePicker' }}
                                value-type="format"
                                format="YYYY-MM-DD"
                                lang={this.lang}
                                prefix-class="xmx"
                            />

                            <transition name="fade">{this.getError(this.error)}</transition>
                        </div>
                    )}
                </div>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .input {
        position: relative;
        max-width: 400px;
        width: 100%;

        font-family: $Roboto;
        padding-bottom: 18px;

        &.isError &__input {
            border: 1px solid $red !important;
            background-color: $white !important;
        }

        &.isSuccess &__input {
            border: 1px solid $mainGreen;
            background-color: $white;
        }

        &--select &__input {
            cursor: pointer;
            padding-right: 30px;
        }

        &--select.isSuccess &__input {
            border: 1px solid transparent;
            background-color: $graySoft;
        }

        &--select.isOpen.isSuccess &__input {
            border: 1px solid $mainGreen;
            background-color: $white;
        }

        &--select.isOpen.isSuccess.disabled &__input[readonly='readonly'] {
            background-color: #f3f4f4;
            border-color: transparent;
            cursor: default;
        }

        /*&--select.isSuccess{
            border: 1px solid transparent;
            background-color: $graySoft;
        }*/

        &--select.isOpen.isSuccess &__input[readonly='readonly'] {
            color: $mainText;
            border: 1px solid $mainGreen;
            background-color: $white;
            cursor: pointer;
        }

        &--select.isError &__errorMessage {
            bottom: -18px;
        }

        &.isFocused &__input {
            background-color: $white;
        }

        &__errorMessage {
            position: absolute;
            bottom: 2px;
            left: 0;
            width: 100%;

            font-size: 10px;
            color: $red;
            font-weight: 400;
            line-height: 1.2;
        }

        &__wrapper {
            display: block;
            width: 100%;

            font-size: 12px;
            font-weight: 400;
            color: $additionalText;
        }

        &__labelText {
            display: block;
            margin-bottom: 4px;

            color: #747678;
            line-height: 1.2;
            font-size: 12px;
            font-weight: 400;
        }

        &__input {
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 10px;

            text-overflow: ellipsis;
            overflow: hidden;
            border-radius: 2px;
            border: 1px solid $inputBorder;
            background-color: $graySoft;
            color: $mainText;
            font-size: 12px;
            box-shadow: none;

            transition: border 0.1s ease, background-color 0.1s ease;

            &::placeholder {
                color: $gray;
            }

            &--tel {
                padding-left: 35px;
            }
        }

        &__input,
        .isSuccess &__input {
            &[readonly],
            &[disabled] {
                background-color: #f3f4f4;
                border-color: transparent;
                cursor: default;
                color: #b1b4b8;
            }
        }

        &--select &__input {
            &[readonly],
            &[disabled] {
                /*         background-color: $graySoft;
                border-color: $inputBorder;*/
                cursor: default;
                /*color: #b1b4b8;*/
            }
        }

        &__phonePrefix {
            position: absolute;
            top: 0;
            left: 20px;
            display: flex;
            align-items: center;
            height: 35px;

            color: #3d4248;
            font-size: 12px;
        }

        &__autocomplete {
            position: absolute;
            z-index: 5;
            top: calc(100% - 1px);
            left: 0;

            width: 100%;
            max-height: 350px;

            background: $white;
            overflow-y: auto;
            border: 1px solid $mainGreen;
            border-radius: 0 0 2px 2px;
            border-top: none;
        }

        &__autocompleteItem {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 36px;
            padding: 0 10px;

            font-size: 12px;
            background-color: $white;
            cursor: pointer;

            &:hover {
                background-color: $graySoft;
            }
        }
    }
</style>
