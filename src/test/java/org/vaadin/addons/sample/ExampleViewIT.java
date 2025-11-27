package org.vaadin.addons.sample;


import com.vaadin.flow.component.html.testbench.DivElement;
import com.vaadin.testbench.BrowserTest;
import com.vaadin.testbench.BrowserTestBase;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;

/** Integration test for the component.
 *
 */
public class ExampleViewIT extends BrowserTestBase {

    /**
     * If running on CI, get the host name from environment variable HOSTNAME
     *
     * @return the host name
     */
    private static String getDeploymentHostname() {
        String hostname = System.getenv("HOSTNAME");
        if (hostname != null && !hostname.isEmpty()) {
            return hostname;
        }
        return "localhost";
    }

    @BeforeEach
    public void open() {
        getDriver().get("http://"+getDeploymentHostname()+":8099/"); // it profile uses 8099 for dev server
    }


    @BrowserTest
    public void componentIsPresent()  {
        ClockElement elem = $(ClockElement.class).first();
        Assertions.assertNotNull(elem);
    }
}