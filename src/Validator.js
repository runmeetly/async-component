/*
 *  Copyright 2019 Meetly Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**
 * Used to validate the provided importComponent
 *
 * Makes sure that the importComponent is of the same type as whatever the engine
 * considers a function type to be.
 * @private
 */
const FUNCTION_TYPE = typeof function() {};

/**
 * Throw an error
 *
 * @private
 * @param {string} message - Provided error message
 */
const error = message => {
  throw new Error(message);
};

/**
 * Validator verifies that arguments given to it are valid
 */
export class Validator {
  /**
   * Validate that the provided import is present and valid
   *
   * @param {function} importComponent - import function
   * @return {function}
   */
  static importComponent(importComponent) {
    if (!importComponent || typeof importComponent !== FUNCTION_TYPE) {
      error("importComponent must be a callback (...) -> Promise");
    }

    return importComponent;
  }
}
