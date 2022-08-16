package org.vaadin.addons.sample;


import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.junit.Test;

/** Integration test for the component.
 *
 */
public class ExampleViewIT extends AbstractTestBenchIntegrationTest {

    public ExampleViewIT() {
        super();
    }

    @Test
    public void componentIsPresent()  {
        ClockElement elem = $(ClockElement.class).first();
        Assert.assertNotNull(elem);
    }
}