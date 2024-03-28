const leaderboardData = document.getElementById('leaderboard-data');

function updateLeaderboardData() { 
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTDcBOavGZmZ1TlW08qRQFq2ygVBEH5luG6D737mxv98SXLzEEURXEUQ6JYbh_ZEPshv6gnQ1aTtu7Y/pubhtml?gid=0&range=A2:C21&single=true'; // Replace placeholders
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n').slice(1); // Skip header row
      leaderboardData.innerHTML = ''; // Clear existing data
      rows.forEach(row => {
        const columns = row.split('\t');
        const rowElement = document.createElement('tr');
        let medal = '';
        if (columns[0] === '1') {
          medal = ''; // Gold medal emoji
        } else if (columns[0] === '2') {
          medal = ''; // Silver medal emoji
        } else if (columns[0] === '3') {
          medal = ''; // Bronze medal emoji
        }
        rowElement.innerHTML = `<td>${medal + columns[0]}</td> <td>${columns[1]}</td> <td>${columns[2]}</td>`;
        leaderboardData.appendChild(rowElement);
      });
    });
}

updateLeaderboardData();
setInterval(updateLeaderboardData, 60000); // Update every minute
