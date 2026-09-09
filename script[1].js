const state = {
  nextEventId: 1,
  processes: [
    { id: "P1", clock: 0, events: [] },
    { id: "P2", clock: 0, events: [] },
    { id: "P3", clock: 0, events: [] }
  ],
  events: []
};

const $ = (id) => document.getElementById(id);

function processById(id) {
  return state.processes.find(p => p.id === id);
}

function allEvents() {
  return [...state.events].sort((a, b) =>
    a.timestamp - b.timestamp ||
    a.process.localeCompare(b.process) ||
    a.id - b.id
  );
}

function addEvent(process, type, details, timestamp) {
  const event = {
    id: state.nextEventId++,
    process: process.id,
    type,
    details,
    timestamp
  };
  process.events.push(event);
  state.events.push(event);
  return event;
}

function localEvent(processId, type = "Local", details = "Independent computation") {
  const p = processById(processId);
  p.clock += 1;
  addEvent(p, type, details, p.clock);
  render();
}

function sendMessage(senderId, receiverId) {
  if (senderId === receiverId) {
    alert("Choose two different processes.");
    return;
  }
  const sender = processById(senderId);
  const receiver = processById(receiverId);

  sender.clock += 1;
  const sendEvent = addEvent(
    sender,
    "Send",
    `Message → ${receiver.id} (t=${sender.clock})`,
    sender.clock
  );

  receiver.clock = Math.max(receiver.clock, sendEvent.timestamp) + 1;
  addEvent(
    receiver,
    "Receive",
    `Message ← ${sender.id} (received t=${sendEvent.timestamp})`,
    receiver.clock
  );
  render();
}

function processOptions(select) {
  select.innerHTML = state.processes
    .map(p => `<option value="${p.id}">${p.id}</option>`)
    .join("");
}

function renderSelectors() {
  ["processSelect", "senderSelect", "receiverSelect"].forEach(id => processOptions($(id)));
  if (state.processes.length > 1) $("receiverSelect").selectedIndex = 1;
}

function renderProcesses() {
  $("processes").innerHTML = state.processes.map(p => `
    <div class="process">
      <div class="process-head">
        <span class="process-name">${p.id}</span>
        <span class="clock">C = ${p.clock}</span>
      </div>
      <div class="timeline">
        ${p.events.length ? p.events.map(e => `
          <div class="event-chip">
            <div class="time">${e.timestamp}</div>
            <div class="kind">${e.type}</div>
            <div class="detail">Event #${e.id}<br>${e.details}</div>
          </div>
        `).join("") : `<div class="empty">No events yet.</div>`}
      </div>
    </div>
  `).join("");
}

function renderTable() {
  $("eventTable").innerHTML = allEvents().map((e, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>#${e.id}</td>
      <td>${e.process}</td>
      <td><span class="badge ${e.type.toLowerCase()}">${e.type}</span></td>
      <td><strong>${e.timestamp}</strong></td>
      <td>${e.details}</td>
    </tr>
  `).join("") || `<tr><td colspan="6" class="empty">No events yet. Use the controls above.</td></tr>`;
}

function renderStats() {
  $("processCount").textContent = state.processes.length;
  $("eventCount").textContent = state.events.length;
  $("messageCount").textContent = state.events.filter(e => e.type === "Send").length;
  $("nextId").textContent = state.nextEventId;
}

function render() {
  renderSelectors();
  renderProcesses();
  renderTable();
  renderStats();
}

$("localBtn").addEventListener("click", () => {
  localEvent($("processSelect").value);
});

$("sendBtn").addEventListener("click", () => {
  sendMessage($("senderSelect").value, $("receiverSelect").value);
});

$("addProcessBtn").addEventListener("click", () => {
  const name = $("processName").value.trim().toUpperCase();
  if (!/^P\d+$/.test(name)) {
    alert("Use a process name like P4.");
    return;
  }
  if (state.processes.some(p => p.id === name)) {
    alert("That process already exists.");
    return;
  }
  state.processes.push({ id: name, clock: 0, events: [] });
  $("processName").value = "";
  render();
});

$("resetBtn").addEventListener("click", () => {
  state.nextEventId = 1;
  state.events = [];
  state.processes = [
    { id: "P1", clock: 0, events: [] },
    { id: "P2", clock: 0, events: [] },
    { id: "P3", clock: 0, events: [] }
  ];
  render();
});

render();
