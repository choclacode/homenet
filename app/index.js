/**
 * HomeNet « Local Private Network
 *
 * The Appplication Entrypoint
 *
 * Author: Saqib https://saqib.ml <contact@saqib.ml>
 * url: http://homenet.saqib.ml
 */

'use strict'

const express = require('express')

const config = require('./config')

config(express())
