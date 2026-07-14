import {css, html, LitElement, TemplateResult, PropertyValueMap } from 'lit';

/** Custom elemnt displaying current time clock.
 *
 * Element impleme
 *
 * Note: this component intentionally avoids the `@customElement`/`@property`
 * decorators from 'lit/decorators.js'. Add-on frontend sources are copied into
 * the consuming project's `generated/jar-resources` folder, which is excluded
 * from the generated tsconfig, so `experimentalDecorators` is not applied when
 * the bundle is built. Using the static `properties` API and an explicit
 * `customElements.define` keeps the emitted bundle valid JavaScript.
 */
export class ClockElement extends LitElement {

    static properties = {
        showSeconds: { type: Boolean },
        format12h: { type: Boolean },
        updateInterval: { type: Number },
    };

    // `declare` emits no class field, so these do not shadow the reactive
    // property accessors Lit installs from the static `properties` block.
    declare showSeconds: boolean;

    declare format12h: boolean;

    declare updateInterval: number;

    // Formatted strings of current time
    private _hours: string = "";
    private _minutes: string = "";
    private _seconds: string = "";
    private _period: string = "";

    // Handle to periodic updater
    updater?: any;

    constructor() {
        super();
        this.showSeconds = true;
        this.format12h = false;
        this.updateInterval = 0;
    }

    /** Update the time fields based on current time.
     * 
     * Uses new Date() to obtain current time. 
     * 
     */
    _updateTimeFields(): void {

        let date: Date = new Date();
        var h: number = date.getHours();
        var m: number = date.getMinutes();
        var s: number = date.getSeconds();

        // Format using 12 hour AM/PM formatting
        if(this.format12h) {

            if (h < 12) {
                this._period = "AM";
            } else {
                this._period  = "PM";
            }

            if (h == 0) {
                h = 12;
            } else if (h > 12) {
                h = h - 12;
            }
        }

        // Add leading zeros to all fields
        this._hours = ""+h;
        this._minutes = (m < 10) ? "0" + m : ""+m;
        this._seconds  = (s < 10) ? "0" + s : ""+s;

        // We request re-rendering of the element
        this.requestUpdate();
    }

    /** Restart or stop the perionic updates for the clock. 
     * 
     */
    _restartPeriodicUpdater() {
        if (this.updater) {
            clearInterval(this.updater)
        }
        if (this.updateInterval > 0) { 
            this.updater = setInterval(() => { this._updateTimeFields() }, 1000*this.updateInterval);
        }
    }

    /** This disables the shadow DOM for this element. 
     *  
     *  Uncomment this, if you don't want to utilize shadow DOM. It might be needed when you e.g. 
     * integrate with external JavaScript libraries to give them access to the component structure.
     *
    createRenderRoot() {
        return this;
    }
    */

    /** Render the clock.
     * 
     * Add a template to your component to define what it should render. 
     * Templates can include expressions, which are placeholders for dynamic content.
     * 
     */
    render(): TemplateResult {
        return html`
            <span part="hours">${this._hours}</span>:<span part="minutes">${this._minutes}</span>${this.showSeconds? html`:<span part="seconds">${this._seconds}</span>`: html``}
            ${this.format12h ? html` <span part="period">${this._period}</span>`: html``}
        `;
    } 

    /** Invoked when a component is added to the document's DOM. 
     * 
     */
    connectedCallback(): void {
        super.connectedCallback();
        this._updateTimeFields();
    }

    /** Controls whether an update rendering should proceed. 
     *  
     *  We only override this to restart the timer if 'updateInterval' property has changed.
     * 
     */
    shouldUpdate(changedProperties: PropertyValueMap<any>) {
        this._updateTimeFields();
        if (changedProperties.has('updateInterval')) {this._restartPeriodicUpdater();}        
        return super.shouldUpdate(changedProperties);
    }

}

customElements.define('clock-element', ClockElement);
