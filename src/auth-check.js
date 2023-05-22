if (localStorage.getItem('user') === null) {
    console.log('User not logged in');
    window.location.href = '/login/'
}