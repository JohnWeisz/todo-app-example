/**
 * Binds an instance method to the containing class to persist the lexical scope of 'this', regardless of the syntax of invocation.
 * Use this decorator before other method decorators.
 * This decorator has a small call overhead on the initial call, and a negligible call overhead on successive invocations.
 *
 * @param {Object | Function} target The target class or prototype.
 * @param {string | symbol} propKey The property key of the target method.
 */
export function bind(target, propKey, descriptor)
{
    let originalMethod = descriptor.get ? descriptor.get() : descriptor.value;

    if (typeof originalMethod !== "function")
    {
        if (process.env.NODE_ENV === "development")
        {
            console.error(new TypeError("@bind can only be used on a method."));
        }

        return;
    }

    if (typeof target === "function")
    {
        // Static method, bind to class.
        return {
            value: function ()
            {
                return originalMethod.apply(target, arguments);
            }
        };
    }
    else if (typeof target === "object")
    {
        // Instance method, bind to instance on first invocation (as that is the only way to access an instance from a decorator).
        return {
            get: function ()
            {
                // Create bound override on object instance. This will hide the original method on the prototype, and instead yield a bound version from the
                // instance itself. The original method will no longer be accessible. Inside a getter, 'this' will refer to the instance.
                let instance = this;

                Object.defineProperty(instance, propKey.toString(), {
                    value: function ()
                    {
                        // This is effectively a lightweight bind() that skips many (here unnecessary) checks in native implementations.
                        // Although see https://codereview.chromium.org/2916063002/.
                        return originalMethod.apply(instance, arguments);
                    }
                });

                // The first invocation (per instance) will return the bound method from here. Subsequent calls will never reach this point, due to the way
                // JavaScript runtimes look up properties on objects; the bound method, defined on the instance, will effectively hide it. This will provide a
                // good, natively optimized performance.
                return instance[propKey.toString()];
            }
        };
    }
}
