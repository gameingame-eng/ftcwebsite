// Triple launch system
            case LAUNCH:
                if (shotsFired < 4) {
                    double elapsed = feederTimer.milliseconds();

                    if (elapsed < 200) {
                        // Phase 1: Extend feeder/Push ball
                        leftFeeder.setPower(FULL_SPEED);
                        rightFeeder.setPower(FULL_SPEED);
                    } else if (elapsed < 400) {
                        // Phase 2: Retract feeder/Wait for next ball
                        leftFeeder.setPower(STOP_SPEED);
                        rightFeeder.setPower(STOP_SPEED);
                    } else {
                        // Phase 3: One shot complete, reset timer for the next one
                        shotsFired++;
                        feederTimer.reset();
                    }
                } else {
                    // All 3 shots done
                    launchState = LaunchState.IDLE;
                    shotsFired = 0;
                }