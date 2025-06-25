// js/app.js
class SwissPolicyMonitor {
    constructor() {
        this.currentFilters = {
            topics: [],
            federal: [],
            cantons: [],
            startDate: null,
            endDate: null
        };
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupEventListeners();
        this.loadSavedSearches();
        this.updateLastUpdate();
        this.fetchData();
    }

    setupFilters() {
        // Setup Topic Filters
        const topicFilters = document.getElementById('topicFilters');
        topicFilters.innerHTML = CONFIG.topics.map(topic => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                       id="topic_${topic.id}" value="${topic.id}">
                <label class="form-check-label" for="topic_${topic.id}">
                    ${topic.name}
                </label>
            </div>
        `).join('');

        // Setup Federal Filters
        const federalFilters = document.getElementById('federalFilters');
        federalFilters.innerHTML = CONFIG.federal.map(item => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                       id="federal_${item.id}" value="${item.id}">
                <label class="form-check-label" for="federal_${item.id}">
                    ${item.name}
                </label>
            </div>
        `).join('');

        // Setup Cantonal Filters
        const cantonalFilters = document.getElementById('cantonalFilters');
        cantonalFilters.innerHTML = CONFIG.cantons.map(canton => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                       id="canton_${canton.id}" value="${canton.id}">
                <label class="form-check-label" for="canton_${canton.id}">
                    ${canton.name}
                </label>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Email PDF form submission
        document.getElementById('emailPdfForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendEmailPDF();
        });
    }

    updateLastUpdate() {
        const now = new Date();
        document.getElementById('lastUpdate').textContent = 
            `Last updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }

    applyFilters() {
        // Collect filter values
        this.currentFilters.topics = Array.from(document.querySelectorAll('#topicFilters input:checked'))
            .map(cb => cb.value);
        this.currentFilters.federal = Array.from(document.querySelectorAll('#federalFilters input:checked'))
            .map(cb => cb.value);
        this.currentFilters.cantons = Array.from(document.querySelectorAll('#cantonalFilters input:checked'))
            .map(cb => cb.value);
        this.currentFilters.startDate = document.getElementById('startDate').value;
        this.currentFilters.endDate = document.getElementById('endDate').value;

        this.fetchData();
    }

    async fetchData() {
        // Simulate API call with filtered data
        const data = [
            {
                id: 1,
                date: '2023-12-05',
                source: 'Federal Parliament',
                type: 'Motion',
                title: 'National Strategy for Obesity Prevention',
                status: 'Pending',
                topics: ['obesity', 'prevention']
            },
            // Add more dummy data
        ];

        this.displayResults(data);
    }

    displayResults(data) {
        const tbody = document.getElementById('resultsTable');
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${item.date}</td>
                <td>${item.source}</td>
                <td>${item.type}</td>
                <td>${item.title}</td>
                <td><span class="badge bg-primary">${item.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" 
                            onclick="policyMonitor.saveItem(${item.id})">
                        <i class="bi bi-bookmark"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    exportData(format) {
        // Implement export logic
        alert(`Exporting in ${format} format...`);
    }

    emailPDF() {
        const emailModal = new bootstrap.Modal(document.getElementById('emailPdfModal'));
        emailModal.show();
    }

    sendEmailPDF() {
        const recipients = document.getElementById('emailRecipients').value;
        const subject = document.getElementById('emailSubject').value;
        const message = document.getElementById('emailMessage').value;

        // Implement email sending logic
        alert(`Sending PDF report to ${recipients}`);
    }

    saveItem(id) {
        // Implement save logic
        alert(`Item ${id} saved`);
    }
}

const policyMonitor = new SwissPolicyMonitor();