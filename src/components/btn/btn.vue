<script>
    export default {
        name: 'Btn',

        props: {
            type: {
                type: String,
                default() {
                    return '';
                },
                validator(value) {
                    return ['success', 'danger', ''].includes(value) === true;
                },
            },
            error: {
                default() {
                    return null;
                },
            },
            iconPosition: {
                type: String,
                default() {
                    return 'last';
                },
                validator(value) {
                    return ['first', 'last', 'top', 'bottom'].includes(value) === true;
                },
            },
        },

        computed: {
            buttonClass() {
                let className = 'btn';

                if (this.$slots.icon) {
                    if (this.error) {
                        className += ' isError ';
                    }

                    if (this.type === 'success') {
                        className += ' btn--green ';
                    }

                    if (this.type === 'danger') {
                        className += ' btn--danger ';
                    }

                    if (this.iconPosition === 'first') {
                        className += 'iconPosition-first ';
                    }

                    if (this.iconPosition === 'last') {
                        className += ' iconPosition-last ';
                    }

                    if (this.iconPosition === 'top') {
                        className += ' iconPosition-top ';
                    }

                    if (this.iconPosition === 'bottom') {
                        className += ' iconPosition-bottom ';
                    }
                }

                return className;
            },
        },

        render() {
            return (
                <button class={this.buttonClass} name="btn" onFocus={() => this.$emit('clearError')} onClick={() => this.$emit('click')}>
                    {this.$slots.default}

                    {this.$slots.icon}

                    {this.error && <p class="btn__errorMessage">{this.error}</p>}
                </button>
            );
        },
    };
</script>

<style lang="scss">
    @import '../../assets/globals';

    .btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 220px;
        height: 36px;
        padding: 0 30px;

        background: $white;
        border: 1px solid $gray;
        border-radius: 2px;
        font-family: $Roboto;
        font-weight: 500;
        font-size: 12px;
        color: #3d4248;
        letter-spacing: 0.5px;

        transition: all ease 0.15s;

        @include below($md-desktop) {
            min-width: 180px;
        }

        &.is-active {
            color: #fff;
            background: #3d4248;
            border: 1px solid #3d4248;

            &:hover {
                background: #3d4248;
                border: 1px solid #3d4248;
            }
        }

        &:hover {
            border: 1px solid $additionalGreen;
            background: $additionalGreen;
            color: $white;
        }

        &--green {
            color: $white;
            background: $mainGreen;
            border: 1px solid $mainGreen;

            &:hover {
                background: $additionalGreen;
            }
        }

        &--danger {
            color: $white;
            background-color: $red;
            border: 1px solid transparent;

            &:hover {
                background-color: darken($red, 10%);
                border: 1px solid transparent;
            }
        }

        &--icon {
            padding-right: 50px;
        }

        &__icon {
            position: absolute;
            right: 14px;
            top: 10px;

            width: 14px;
            height: 14px;

            fill: $white;
        }

        &.isError {
            background-color: $red;
            border-color: $red;
        }

        &__errorMessage {
            position: absolute;
            top: calc(100% + 3px);
            left: 0;
            width: 100%;

            font-size: 10px;
            color: $red;
            font-weight: 400;
            text-align: left;
            line-height: 1.2;
        }
    }
</style>
