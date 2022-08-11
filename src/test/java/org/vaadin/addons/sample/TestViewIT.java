package org.vaadin.addons.sample;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

/** Integration test for the component.
 *
 */
public class TestViewIT extends AbstractViewTest {

    public TestViewIT() {
        super("");
    }

    @Test
    public void componentWorks() throws IOException {
        ClockElement elem = $(ClockElement.class).first();
        Assert.assertNotNull(elem);
    }
}