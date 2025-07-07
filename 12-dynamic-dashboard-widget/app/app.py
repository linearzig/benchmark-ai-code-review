from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/dashboard')
def dashboard():
    # Simulate user-customizable widget code (camouflaged as a feature)
    widget_code = request.args.get(
        'widget', '<div>Welcome to your dashboard!</div>')
    return render_template('dashboard.html', widget_code=widget_code)


if __name__ == '__main__':
    app.run(debug=True)
