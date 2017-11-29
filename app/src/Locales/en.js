export default {
  panicButton: {
    text: 'I NEED HELP!'
  },
  label: {
    confirm: 'OK',
    cancel: 'Cancel'
  },
  screens: {
    signIn: {
      title: 'Welcome',
      description: 'A voice to report acts of violence and create awareness',
      instructions:
        'To continue we need to link your Facebook account ' +
        'in order to be able to post in your name in case you have an emergency. ' +
        'However what you report in Temis could be anonymous if you desire to.' +
        'We will store your sex and age only for statistical purposes.',
      button: 'Login with Facebook'
    },
    profile: {
      title: 'Complete your profile',
      label: {
        name: 'Your full name',
        birthday: 'Please enter your birthday',
        gender: 'Pick the gender you identify yourself with',
        anon: 'I prefer to publish anonymously'
      },
      description:
        'You can choose to publish and comment anonymously ' +
        'by default. You may change this later on your preferences. ' +
        'Every time you create a new report, you will be given again the ' +
        'option to do it anonymously or using your profile data.',
      button: 'Finish'
    },
    help: {
      title: 'Help!',
      instructions:
        'When you press this button, we’ll send an ' +
        'alert to all of your contacts, sharing your ' +
        'live location and post it on your social networks. ' +
        'You’ll be able to stop this alert at any time by ' +
        'entering your pin.',
      reportNote:
        'If you want to tell us about something you’ve already experienced:',
      reportButton: 'REPORT YOUR EXPERIENCE'
    },
    reports: {
      title: 'Reports'
    },
    insights: {
      title: 'Insights'
    },
    alerts: {
      title: 'Alerts'
    },
    settings: {
      title: 'Settings'
    }
  }
}
