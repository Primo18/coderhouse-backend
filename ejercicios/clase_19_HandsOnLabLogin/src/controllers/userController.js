export const getProfile = (req, res) => {
    const { first_name, last_name, email, age, role } = req.session.user;
    res.render('profile', {
        role, first_name, last_name, email, age, title: 'Profile Page', style: 'profile.css'
    });
};
