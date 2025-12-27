package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.GridLayout;

public class MainActivity extends AppCompatActivity {

    // Déclaration des composants d'interface
    private TextView displayTextView;
    private TextView historyTextView;
    private TextView modeIndicator;
    private TextView memoryIndicator;
    private GridLayout scientificButtons;
    private GridLayout standardButtons;

    // Variables pour les opérations
    private String currentInput = "0";
    private String currentOperation = "";
    private String firstOperand = "";
    private String secondOperand = "";
    private boolean isScientificMode = false;
    private boolean isNewInput = true;
    private double memoryValue = 0;
    private String history = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialiser les vues
        initializeViews();

        // Configurer les boutons
        setupAllButtons();

        // Mettre à jour l'affichage initial
        updateDisplay();
        updateMemoryIndicator();
    }

    private void initializeViews() {
        displayTextView = findViewById(R.id.displayTextView);
        historyTextView = findViewById(R.id.historyTextView);
        modeIndicator = findViewById(R.id.modeIndicator);
        memoryIndicator = findViewById(R.id.memoryIndicator);
        scientificButtons = findViewById(R.id.scientificButtons);
        standardButtons = findViewById(R.id.standardButtons);
    }

    private void setupAllButtons() {
        setupNumberButtons();
        setupOperationButtons();
        setupFunctionButtons();
        setupMemoryButtons();
        setupModeButton();
    }

    private void setupNumberButtons() {
        int[] numberButtonIds = {
                R.id.btn0, R.id.btn1, R.id.btn2, R.id.btn3, R.id.btn4,
                R.id.btn5, R.id.btn6, R.id.btn7, R.id.btn8, R.id.btn9
        };

        for (int id : numberButtonIds) {
            Button button = findViewById(id);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String number = ((Button) v).getText().toString();
                    inputNumber(number);
                }
            });
        }
    }

    private void setupOperationButtons() {
        // Boutons d'opérations de base
        findViewById(R.id.btnPlus).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setOperation("+");
            }
        });

        findViewById(R.id.btnMinus).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setOperation("-");
            }
        });

        findViewById(R.id.btnMultiply).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setOperation("×");
            }
        });

        findViewById(R.id.btnDivide).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setOperation("÷");
            }
        });

        // Bouton égal
        findViewById(R.id.btnEquals).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                calculateResult();
            }
        });

        // Bouton point décimal
        findViewById(R.id.btnDecimal).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!currentInput.contains(".")) {
                    if (isNewInput) {
                        currentInput = "0.";
                        isNewInput = false;
                    } else {
                        currentInput += ".";
                    }
                    updateDisplay();
                }
            }
        });

        // Boutons de fonction standard
        findViewById(R.id.btnClearStandard).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clearAll();
            }
        });

        findViewById(R.id.btnBackspaceStandard).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                backspace();
            }
        });

        findViewById(R.id.btnPercentStandard).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                calculatePercentage();
            }
        });
    }

    private void setupFunctionButtons() {
        // Boutons scientifiques
        findViewById(R.id.btnSin).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyScientificFunction("sin");
            }
        });

        findViewById(R.id.btnCos).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyScientificFunction("cos");
            }
        });

        findViewById(R.id.btnTan).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyScientificFunction("tan");
            }
        });

        findViewById(R.id.btnLog).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyScientificFunction("log");
            }
        });

        findViewById(R.id.btnLn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyScientificFunction("ln");
            }
        });

        findViewById(R.id.btnSqrt).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                applyScientificFunction("√");
            }
        });

        findViewById(R.id.btnPower).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setOperation("^");
            }
        });

        findViewById(R.id.btnPi).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                inputConstant(Math.PI);
            }
        });

        findViewById(R.id.btnE).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                inputConstant(Math.E);
            }
        });

        findViewById(R.id.btnFactorial).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                calculateFactorial();
            }
        });

        findViewById(R.id.btnOpenParen).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                inputCharacter("(");
            }
        });

        findViewById(R.id.btnCloseParen).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                inputCharacter(")");
            }
        });

        // Boutons de fonction dans le panneau scientifique
        findViewById(R.id.btnClear).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clearAll();
            }
        });

        findViewById(R.id.btnBackspace).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                backspace();
            }
        });

        findViewById(R.id.btnPercent).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                calculatePercentage();
            }
        });
    }

    private void setupMemoryButtons() {
        findViewById(R.id.btnMC).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                memoryClear();
            }
        });

        findViewById(R.id.btnMR).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                memoryRecall();
            }
        });

        findViewById(R.id.btnMS).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                memoryStore();
            }
        });

        findViewById(R.id.btnMPlus).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                memoryAdd();
            }
        });

        findViewById(R.id.btnMMinus).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                memorySubtract();
            }
        });
    }

    private void setupModeButton() {
        Button toggleButton = findViewById(R.id.btnToggleMode);
        toggleButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                toggleScientificMode();
            }
        });
    }

    // Méthodes pour la logique de la calculatrice

    private void inputNumber(String number) {
        if (isNewInput) {
            currentInput = number;
            isNewInput = false;
        } else {
            if (currentInput.equals("0")) {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    private void inputCharacter(String character) {
        if (isNewInput) {
            currentInput = character;
            isNewInput = false;
        } else {
            currentInput += character;
        }
        updateDisplay();
    }

    private void inputConstant(double constant) {
        currentInput = String.valueOf(constant);
        isNewInput = true;
        updateDisplay();
    }

    private void setOperation(String operation) {
        if (!currentOperation.isEmpty()) {
            calculateResult();
        }

        firstOperand = currentInput;
        currentOperation = operation;
        history = firstOperand + " " + operation;
        historyTextView.setText(history);
        isNewInput = true;
    }

    private void calculateResult() {
        if (currentOperation.isEmpty() || firstOperand.isEmpty()) {
            return;
        }

        secondOperand = currentInput;
        double result = 0;
        double firstNum = Double.parseDouble(firstOperand);
        double secondNum = Double.parseDouble(secondOperand);

        try {
            switch (currentOperation) {
                case "+":
                    result = firstNum + secondNum;
                    break;
                case "-":
                    result = firstNum - secondNum;
                    break;
                case "×":
                    result = firstNum * secondNum;
                    break;
                case "÷":
                    if (secondNum == 0) {
                        displayTextView.setText("Erreur");
                        return;
                    }
                    result = firstNum / secondNum;
                    break;
                case "^":
                    result = Math.pow(firstNum, secondNum);
                    break;
            }

            // Mettre à jour l'historique
            history = firstOperand + " " + currentOperation + " " + secondOperand + " =";
            historyTextView.setText(history);

            // Afficher le résultat
            currentInput = formatResult(result);
            currentOperation = "";
            firstOperand = "";
            secondOperand = "";
            isNewInput = true;
            updateDisplay();

        } catch (Exception e) {
            displayTextView.setText("Erreur");
        }
    }

    private void applyScientificFunction(String function) {
        double value = Double.parseDouble(currentInput);
        double result = 0;

        try {
            switch (function) {
                case "sin":
                    result = Math.sin(Math.toRadians(value));
                    break;
                case "cos":
                    result = Math.cos(Math.toRadians(value));
                    break;
                case "tan":
                    result = Math.tan(Math.toRadians(value));
                    break;
                case "log":
                    if (value <= 0) {
                        displayTextView.setText("Erreur");
                        return;
                    }
                    result = Math.log10(value);
                    break;
                case "ln":
                    if (value <= 0) {
                        displayTextView.setText("Erreur");
                        return;
                    }
                    result = Math.log(value);
                    break;
                case "√":
                    if (value < 0) {
                        displayTextView.setText("Erreur");
                        return;
                    }
                    result = Math.sqrt(value);
                    break;
            }

            history = function + "(" + currentInput + ") =";
            historyTextView.setText(history);
            currentInput = formatResult(result);
            isNewInput = true;
            updateDisplay();

        } catch (Exception e) {
            displayTextView.setText("Erreur");
        }
    }

    private void calculateFactorial() {
        try {
            int n = Integer.parseInt(currentInput);
            if (n < 0 || n > 20) {
                displayTextView.setText("Erreur");
                return;
            }

            long result = 1;
            for (int i = 2; i <= n; i++) {
                result *= i;
            }

            history = currentInput + "! =";
            historyTextView.setText(history);
            currentInput = String.valueOf(result);
            isNewInput = true;
            updateDisplay();

        } catch (Exception e) {
            displayTextView.setText("Erreur");
        }
    }

    private void calculatePercentage() {
        try {
            double value = Double.parseDouble(currentInput);
            double result = value / 100;

            history = currentInput + "% =";
            historyTextView.setText(history);
            currentInput = formatResult(result);
            isNewInput = true;
            updateDisplay();

        } catch (Exception e) {
            displayTextView.setText("Erreur");
        }
    }

    private void backspace() {
        if (currentInput.length() > 1) {
            currentInput = currentInput.substring(0, currentInput.length() - 1);
        } else {
            currentInput = "0";
            isNewInput = true;
        }
        updateDisplay();
    }

    private void clearAll() {
        currentInput = "0";
        currentOperation = "";
        firstOperand = "";
        secondOperand = "";
        history = "";
        isNewInput = true;
        historyTextView.setText("");
        updateDisplay();
    }

    // Fonctions mémoire
    private void memoryClear() {
        memoryValue = 0;
        updateMemoryIndicator();
    }

    private void memoryRecall() {
        currentInput = formatResult(memoryValue);
        isNewInput = true;
        updateDisplay();
    }

    private void memoryStore() {
        try {
            memoryValue = Double.parseDouble(currentInput);
            updateMemoryIndicator();
        } catch (Exception e) {
            // Ignorer l'erreur
        }
    }

    private void memoryAdd() {
        try {
            double current = Double.parseDouble(currentInput);
            memoryValue += current;
            updateMemoryIndicator();
        } catch (Exception e) {
            // Ignorer l'erreur
        }
    }

    private void memorySubtract() {
        try {
            double current = Double.parseDouble(currentInput);
            memoryValue -= current;
            updateMemoryIndicator();
        } catch (Exception e) {
            // Ignorer l'erreur
        }
    }

    private void toggleScientificMode() {
        isScientificMode = !isScientificMode;

        if (isScientificMode) {
            scientificButtons.setVisibility(View.VISIBLE);
            modeIndicator.setText("Mode Scientifique");
            Button toggleButton = findViewById(R.id.btnToggleMode);
            toggleButton.setText("STD");
        } else {
            scientificButtons.setVisibility(View.GONE);
            modeIndicator.setText("Mode Standard");
            Button toggleButton = findViewById(R.id.btnToggleMode);
            toggleButton.setText("SCI");
        }
    }

    private void updateDisplay() {
        displayTextView.setText(currentInput);
    }

    private void updateMemoryIndicator() {
        if (memoryValue != 0) {
            memoryIndicator.setText("M: " + formatResult(memoryValue));
            memoryIndicator.setVisibility(View.VISIBLE);
        } else {
            memoryIndicator.setVisibility(View.GONE);
        }
    }

    private String formatResult(double result) {
        if (result == (long) result) {
            return String.format("%d", (long) result);
        } else {
            String formatted = String.format("%.10f", result);
            formatted = formatted.replaceAll("0*$", "").replaceAll("\\.$", "");
            return formatted;
        }
    }
}
