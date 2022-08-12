

import { customElement, property, css, html, LitElement, TemplateResult, PropertyValueMap } from 'lit-element';

/** Custom elemnt displaying current time clock.
 * 
 * Element impleme
 */
@customElement('clock-element')
export class ClockElement extends LitElement {

    @property() showSeconds : boolean = true;

    @property() format12h : boolean = false;

    @property() updateInterval : number = 0;


    // Formatted strings of current time
    private _hours: string = "";
    private _minutes: string = "";
    private _seconds: string = "";
    private _period: string = "";

    // Handle to periodic updater
    updater?: any;

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
     *  Remove the whole method if you want to utilize shadow DOM.
     */
    createRenderRoot() {
        return this;
    }

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