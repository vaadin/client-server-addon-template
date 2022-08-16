package org.vaadin.addons.sample;

import com.vaadin.componentfactory.ToggleButton;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

/** Test view for manual and automated testing of the component.
 *
 */
@Route("")
public class ExampleView extends VerticalLayout {
    Clock clock = new Clock();
    ToggleButton format12h = new ToggleButton("Use 12 hour format",clock.isFormat12h());
    ToggleButton showSeconds = new ToggleButton("Show seconds",clock.isShowSeconds());
    Select<Integer> update = new Select<>();

    public ExampleView() {

        update.setLabel("Update interval");
        update.setItems(0,1,2,5,10,30,60);
        update.setEmptySelectionAllowed(false);
        update.setItemLabelGenerator(i -> i ==0 ? "disabled": i+" sec"+(i>1?"s":""));

        // Change listeners for the toggle buttons
        format12h.addValueChangeListener(e-> {
           clock.setFormat12h(e.getValue());
        });
        showSeconds.addValueChangeListener(e-> {
            clock.setShowSeconds(e.getValue());
        });
        update.addValueChangeListener(e -> {
            clock.setUpdateInterval(e.getValue());
        });
        add(clock, format12h, showSeconds, update);
    }
}
