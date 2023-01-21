const User = require('../../models/User')


module.exports = {
    discover,
    showPubProfile
}

async function discover(req, res) {
    let publishers = await User.find({ 'paymentInfo': {$ne: ''}, 'publisherAgreement': true })
    // The user may not be a publisher, so grab them separately.
    // If there is a user (i.e. if they're signed in) then grab their object as well, so that I
    // can access their "subscriptions" and decide to show either a "subscribe" or "unsubscribe"
    // button on the frontend.
    if(req.params.id !== 'false') {
        let user = await User.findById(req.params.id)
        let userAndPublishers = {user, publishers}
        res.json(userAndPublishers)
    // If not then just send the publishers
    } else {
        res.json(publishers)
    }
}

async function showPubProfile(req, res) {
    let publisher = await User.findById(req.params.id)
    res.json(publisher)
}