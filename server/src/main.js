'use strict'

import { createApp } from './app'
const config = require('dotenv').config()

// this allows for dependency injection of the config object for testing
const app = createApp(config)

app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost')
