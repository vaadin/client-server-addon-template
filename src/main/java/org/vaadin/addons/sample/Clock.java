package org.vaadin.addons.sample;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HasSize;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JsModule;


@Tag("clock-element")
@JsModule("./clock-element.ts")
@CssImport(value = "./clock-element.css")
public class Clock extends Component implements HasSize {

    // Server.side state variables

    boolean showSeconds = true;
    boolean format12h = false;
    int updateInterval = 0;

    public Clock() {
        this(true, false);
    }

    public Clock(boolean showSeconds, boolean format12h) {
        setShowSeconds(showSeconds);
        setFormat12h(format12h);
    }

    public boolean isShowSeconds() {
        return showSeconds;
    }

    public void setShowSeconds(boolean showSeconds) {
        this.showSeconds = showSeconds;
        getElement().setProperty("showSeconds", this.showSeconds);
    }

    public boolean isFormat12h() {
        return format12h;
    }

    public void setFormat12h(boolean format12h) {
        this.format12h = format12h;
        getElement().setProperty("format12h", this.format12h);
    }

    public int getUpdateInterval() {
        return updateInterval;
    }

    public void setUpdateInterval(int updateInterval) {
        this.updateInterval = updateInterval;
        getElement().setProperty("updateInterval", this.updateInterval);
    }



}
