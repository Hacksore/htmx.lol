import "htmx.org";
import "./style.css";

const wikiEvents = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange");
const eventsContainer = document.getElementById("events");

if (!eventsContainer) {
  throw new Error("events container not found");
}

wikiEvents.onmessage = function(message) {
  const data = JSON.parse(message.data);
  const link = document.createElement("a");
  link.innerHTML = data.title;
  link.href = data.meta.uri;

  // eventsContainer?.appendChild(link)
  // insert element at beggining of div
  eventsContainer.insertBefore(link, eventsContainer.firstChild);

  // get number child elements in the div
  const childCount = eventsContainer?.childElementCount;

  if (childCount && childCount > 100) {
    // remove the first element from the div
    if (eventsContainer.lastChild) {
      eventsContainer.removeChild(eventsContainer.lastChild);
    }
  }

  // don't scroll if user has scrolled down
  if (eventsContainer?.scrollTop > 0) {
    return;
  }

  // scroll to top of div
  eventsContainer?.scrollTo(0, 0);
}
